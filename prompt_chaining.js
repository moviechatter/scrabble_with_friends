// import { axios } from 'axios';
// import { cheerio } from 'cheerio';
// import { sanitizeHtml } from "sanitize-html";
// import { ChatAnthropic } from "langchain/chat_models/anthropic";
// import { ConversationChain } from "langchain/chains";
// import { BufferMemory } from "langchain/memory";
const puppeteer = require('puppeteer');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const ChatAnthropic = require('langchain/chat_models/anthropic').ChatAnthropic;
const ConversationChain = require('langchain/chains').ConversationChain;
const BufferMemory = require('langchain/memory').BufferMemory;
const performance = require('perf_hooks').performance;

async function fetchAndCleanHtml(url) {
    try {
      const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();
  
      // Set a desktop user agent
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36');
  
      await page.goto(url);
  
      const bodyText = await page.evaluate(() => document.body.innerText);
      const imgAlts = await page.evaluate(() =>
        Array.from(document.images, img => img.alt)
      );
  
      await browser.close();
  
      const cleanBodyText = sanitizeHtml(bodyText, {
        allowedTags: [],
        allowedAttributes: {},
      });
  
      const cleanImgAlts = imgAlts.map(alt => sanitizeHtml(alt, {
        allowedTags: [],
        allowedAttributes: {},
      }));
  
      return {
        text: cleanBodyText,
        imgAlts: cleanImgAlts,
      };
    } catch (error) {
      console.error(error);
    }
  }

function filterValidScrabbleWords(claude_scrabble_str) {
    const scrabbleJsonPath = "scrabble_2019.json";
    const parsedClaudeScrabbleWords = JSON.parse(claude_scrabble_str);
    const validScrabbleWords = [];
    fs.readFile(scrabbleJsonPath, 'ascii', function(err, data) {
        if (err) throw err;
        const words = JSON.parse(data);
        const scrabbleSet = new Set(words);
        parsedClaudeScrabbleWords.forEach((word) => {
            if (scrabbleSet.has(word.toUpperCase())) {
                validScrabbleWords.push(word);
            } else {
                console.log(word.toUpperCase())
            }
        })
    });
    return validScrabbleWords;
}

function isValidScrabbleWord(word) {
    const scrabbleJsonPath = "scrabble_2019.json";
    fs.readFile(scrabbleJsonPath, 'ascii', function(err, data) {
        if (err) throw err;
        const words = JSON.parse(data);
        const scrabbleSet = new Set(words);
        return scrabbleSet.has(word.toUpperCase())
    });
}

async function main() {
    const url = "https://www.etsy.com/market/credit_card_skin_charizard";
    // const url = "https://dunkeyscastle.com/";

    let t0 = performance.now();
    const cleaned_html_page = await fetchAndCleanHtml(url);
    let t1 = performance.now();
    console.log(`Call to cleaned_html_page took ${t1 - t0} milliseconds (${(t1 - t0) / 100} seconds).`);

    console.log("cleaned html");

    t0 = performance.now();
    const chat = new ChatAnthropic({
        modelName: "claude-2.0",
        temperature: 0.0,
        topP: 0.9,
        anthropicApiKey: "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",
    });

    const memory = new BufferMemory();

    // This particular chain automatically initializes a BufferMemory instance if none is provided,
    // but we pass it explicitly here. It also has a default prompt.
    const chain = new ConversationChain({ llm: chat, memory: memory });

    console.log(JSON.stringify(cleaned_html_page));
    
    const res1 = await chain.call({ input: `Here is a document, in <document></document> XML tags. This document is cleaned html body text extracted from ${url}: <document>\n${JSON.stringify(cleaned_html_page)}</document>\n\nOnly output 'hi ho sailor' to acknowledge.` });
    console.log(res1);

    const res2 = await chain.call({ input: "Describe this document in an executive summary. If it is a products listing, also list the most relevant products in this webpage." });
    console.log(res2);

    const res3 = await chain.call({ input: "List 'Main Ideas' and 'Themes' of the document content. Even with limited context, extrapolate to the best of your ability." });
    console.log(res3);

    const res4 = await chain.call({ input: "Create a list of words that are most related to the executive summary, main ideas, and themes. Here is an additional list of criteria when choosing keywords: * single words\n* unhyphenated\n* \n\nIn your response, output the words in a single-line JSON array wrapped in <output></output>." });
    console.log(res4);
    t1 = performance.now();
    console.log(`Claude took ${t1 - t0} milliseconds (${(t1 - t0) / 100} seconds).`);

    const output_tag_regex = /<output>\s*(\[.*?\])\s*<\/output>/g;

    let claudeScrabbleWordsStr = output_tag_regex.exec(res4.response);
    console.log(claudeScrabbleWordsStr[1]);

    const filteredScrabbleWords = await filterValidScrabbleWords(claudeScrabbleWordsStr[1]);
    console.log(filteredScrabbleWords);
}

main().catch(console.error);