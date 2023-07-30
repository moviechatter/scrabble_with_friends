<!-- Code that is complete is commented out -->

# Acceptance Criteria:

Michael's Python (<assignee>Michael</assignee>):
#1: ~An accuracy comparison (in Python) to evaluate Scrabble word guesses~
* Take a set of 30 3-letter Scrabble words that start with P (https://scrabble.merriam.com/words/start-with/p)
* Ask OpenAI to give us 30 fake 3-letter words that start with P
* Run Claude as “true” vs. “false” on them and calculate percentage correct
* If passes “good” threshold, we can call it reasonably accurate
* If NOT, we need to do some pre-feeding for model

#2: ~A speed comparison (in Python, javascript?) in evaluating Scrabble word guesses~
* confirmed that it would be easier to load a serialized binary file to JavaScript as a Set object for that sweet sweet O(1) runtime

## Back-end, Claude API to parse for relevant keywords (<assignee>Michael</assignee>, <assignee>Mat</assignee>)
### Process
1. [] Clean webpage/extract relevant text (reduces token usage)
 a. Remove comments, html tags, inline JavaScript, etc.
 b. Extract image alts?
2. [X] Feed cleaned data to Claude API
3. [X] Prompt Chain
 a. What kind of webpage is this?
 b. what is the main idea, give a summary
 c. Extract the most relevant keywords from this webpage and turn into a list. sample prompt: (given the text from this page, create a list of words that are highest related to the executive summary)
 d. [X] Basic prompt chain structure
4. [X] Scrabble word validation (.js)
 a. Iterate through relevant keywords list and filter for valid Scrabble words
5. [] Output valid Scrabble words list, which grants arbitrary amount of bonus points (let's say a flat +3)
### Stretch Goals
* Rank relevant keywords from most to least relevant
 * Given ordered valid Scrabble words list, have Claude assign bonus points based on this ranking
* 

## Front-end, actual web work:
<!-- #0, <assignee>Alex</assignee>: Get 20 random letters from p tags -->

<!-- #1, <assignee>Leah</assignee>: Use JS to transform the 20 letters in <p> elements on page into Scrabble-style letters: use transformLetter() & replace letter with class = “scrabble-styled” <span> tag
* Styles: border-radius: 3px; background-color (?): wood color; color: dark brown, border: 1px solid brown;
* Points in bottom right corner based on letter -->

<!-- #2, <assignee>Leah</assignee>: Make clicking on those letters “shade” them and then bring those into your “inventory” nested on the bottom-right (position: absolute) of your window -->

<!-- #3, <assignee>Leah</assignee>: When you’ve selected 7 tiles, you can’t select any more tiles from page (cursor: disabled, click event.preventDefault) -->

#3.1, <assignee>Leah</assignee>: make inventory/guess rows,

<!-- #4, <assignee>Michael</assignee>: Allow submission of word, run validation check using Michael's validation code from before (adapt into JS using this https://github.com/0xpayne/gpt-migrate) -->

<!-- #5, <assignee>Leah</assignee>: Calculate base points at end (should we have Double Letter, Triple Word bonuses?) with JS function
* Input: string
* Output: integer -->

#5.1, <assignee>Michael</assignee>: Add word relevancy boost using Claude to that base score

#6, <assignee>Alex</assignee>: Bridge into count-up points animation & takeover w/ information sidebar (pre-written code from Playtest project)

#6.1, <assignee>Alex</assignee>: Add timer that counts up for how long you've been on page to demo Playtest value once you click first letter

Useful Links:
* Scrabble Dictionary: https://scrabble.merriam.com/words/start-with/p
* Scrabble Rules: https://www.scrabblepages.com/scrabble/rules/
* Anthropic Documentation: https://docs.anthropic.com/claude/docs
* Hackathon Notion Site: https://cerebralvalley.notion.site/Claude-Hackathon-Event-Details-Hackers-6b3c70c6aacf4e68a41ab55b08582d09
* Talk 2 Claude: www.claude.ai
* GPT Migrate (Python -> JS): https://github.com/0xpayne/gpt-migrate

Other Anthropic Links:
* Prompt Design: https://docs.anthropic.com/claude/docs/introduction-to-prompt-design
* How to get Anthropic working better: https://docs.anthropic.com/claude/docs/let-claude-say-i-dont-know
* Generating content: https://docs.anthropic.com/claude/docs/content-generation
* Troubleshooting Checklist: https://docs.anthropic.com/claude/docs/prompt-troubleshooting-checklist