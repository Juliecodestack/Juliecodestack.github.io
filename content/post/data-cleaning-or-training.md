---
title: "Which comes first, data cleaning or model training?"
description: ""
date: "2023-12-27T20:15:23+08:00"
thumbnail: ""
categories:
  - Machine Learning
tags:
  - fastai
  - Deep Learning
---

In the past, I spent a lot of time on exploratory data analysis(EDA) and data cleaning before putting data into training. After that, I’d like to pick a state-of-the-art model. However, fastai course changed my idea.

<!--more-->

In fastai, Jeremy told us to:

1. train a model to clean the data
2. start with a simple model

The key point is to start the training as early as possible, preferably on day 1. Only after training a model and analyzing the result can you know what kinds of data the model deals with badly, whether the data needs more cleaning, whether the data is enough, whether the problem can be solved using deep learning. This produces an effective feedback to the data part and helps you figure out the truly important feature, which leads to better training. 

Start with a simple model, so you can train it quickly, then improve and iterate fast. After some experiments, finally you may decide whether the performance of the current model is good enough or need to try a more sophisticated model.

This echoes “Finish first, then improve” and target-oriented practice in management. Without training a model, you have no idea about the characteristics of the data. EDA is not enough. Sometimes we may understand the data in a wrong way, leading to the wrong direction of building a model. 

Next time you handle a dataset, you may try this method: only do necessary data cleaning to get the data into the model, then begin with a simple model. For example, always start with a small size pre-trained model for image or text data, or random forest for tabular data. After the training, analyze the results to clean the data or do feature engineering. fastai library provides some handy functions for analysis, for example, confusion matrix, feature importance, etc. 

