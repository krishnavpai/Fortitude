from __future__ import division, print_function
import demoji
from nltk.corpus import stopwords
import nltk
from tensorflow.keras.models import model_from_json
import string
import pandas as pd
import numpy as np

from keras.utils import pad_sequences

from nltk import word_tokenize, WordNetLemmatizer

# from gensim import models
import re
import pickle
loaded_model = None
# nltk.download('stopwords')
# nltk.download('punkt')
# nltk.download('wordnet')


def load():
    global loaded_model
    json_file = open('./models/model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("./models/model.h5")
    print("Loaded model from disk")


def predict():
    global loaded_model
    if(loaded_model == None):
        load()
    predict_stress()


def clean_text(text):

    # removing Punctuations
    text_nopunct = ''
    text_nopunct = re.sub('['+string.punctuation+']', '', text)
    text = text_nopunct

    # removing Hashtag, Mention, URLs
    pattern = re.compile(
        r"(#[A-Za-z0-9]+|@[A-Za-z0-9]+|https?://\S+|www\.\S+|\S+\.[a-z]+|RT @)")
    text = pattern.sub('', text)
    text = " ".join(text.split())

    # make all text lowercase
    text = text.lower()

    # removing stopwords
    STOPWORDS = set(stopwords.words('english'))
    STOPWORDS.remove('not')
    text = " ".join([word for word in str(
        text).split() if word not in STOPWORDS])

    # sub of emojis
    emoji = demoji.findall(text)
    for emot in emoji:
        text = re.sub(r"(%s)" % (emot), "_".join(emoji[emot].split()), text)

    return text


def get_average_word2vec(tokens_list, vector, generate_missing=False, k=300):
    if len(tokens_list) < 1:
        return np.zeros(k)
    if generate_missing:
        vectorized = [vector[word] if word in vector else np.random.rand(
            k) for word in tokens_list]
    else:
        vectorized = [vector[word] if word in vector else np.zeros(
            k) for word in tokens_list]
    length = len(vectorized)
    summed = np.sum(vectorized, axis=0)
    averaged = np.divide(summed, length)
    return averaged


def input_embeddings(vectors, input, generate_missing=False):
    embeddings = get_average_word2vec(
        input, vectors, generate_missing=generate_missing)
    return list(embeddings)


def predict_stress(input):
    global loaded_model
    if(loaded_model == None):
        load()
    with open('./models/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    input = clean_text(input)

    input_sequence = tokenizer.texts_to_sequences([input])
    # print()
    input_train = pad_sequences(input_sequence, maxlen=50)
    input_predict = loaded_model.predict(input_train, batch_size=1, verbose=1)
    labels = [1, 0]
    pred_labels = labels[np.argmax(input_predict)]
    # print(input_predict)
    if pred_labels == 1:
        return "Stress"
    else:
        return "Not Stress"


# predict_stress("i feel alive and i look forward to everyday")
