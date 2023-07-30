import json
import pickle

if __name__ == "__main__":
    scrabble_txt_path = "scrabble_2019.txt"
    with open(scrabble_txt_path, "r") as file:
        words = file.read().splitlines()
    scrabble_set = set(words)
    print('SANGHA' in scrabble_set)

    scrabble_pickle_fn = "scrabble_2019.pkl"
    with open(scrabble_pickle_fn, "wb") as file:
        pickle.dump(scrabble_set, file)