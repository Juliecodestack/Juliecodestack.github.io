---
title: "How to train an image classification model using fastai?"
description: ""
date: "2023-12-26T20:14:46+08:00"
thumbnail: ""
categories:
  - Machine Learning
tags:
  - fastai
  - Deep Learning
  - Computer Vision
---

Can you believe it? On [the very **first class** ](https://course.fast.ai/Lessons/lesson1.html)of fast.ai course: Practical Deep Learning for Coders 2022, I trained an image classification using fastai to tell apples from peaches. (you may click [Kaggle link](https://www.kaggle.com/code/juliecodestack/which-fruit-is-it-apple-or-peach-fast-ai/notebook) to have a look). Amazing! 

You may wonder: can I make it too? 

Yes, of course. Then how to do it? Let's dive into it.

<!--more-->

fastai library is a library built on top of PyTorch and other libraries. With it, we beginners can use the modules to build a model and “play the whole game”. As we learn more, we’ll dig into more details.

I followed Professor Jeremy Howard's example code ( [Is it a bird? Creating a model from your own data | Kaggle](https://www.kaggle.com/code/jhoward/is-it-a-bird-creating-a-model-from-your-own-data)) to train a model to tell whether the fruit in a picture is an apple or a peach. 

The whole process contains four steps, as shown in the figure below:

{{<  figure src="/imgs/fastai-deepl-learning-pipeline.png" title="Figure1. training a deep learning model pipeline" >}}



### Step 0: Collect data 

If you don’t have a dataset, you need to start from this step. In the fast.ai course example code, DuckDuckGo or Bing search api is used to search for images.



### Step 1: Prepare the data

In fastai a `DataBlock` class is provides as a template for you to define the data, then the `dataloaders` pack the data into batches so that we can do the training  in parallel using GPU. 

```python
dls = DataBlock(here to set some parameters).dataloaders(path,bs=32)
```

We’ll talk more about `DataBlock` later.



### Step 2: Training the model 

fastai does the training for you, and you just need to set data(dls), model(resnet18) and metrics. It takes only two lines of code:

```python
learn = vision_learner(dls, resnet18, metrics=error_rate)
learn.fine_tune(5)
```

In a minute, the model will be trained.

To accelerate the training, here we use a pre-trained model and finetune it.  You may wonder, what is a pre-trained model? 

We do the training to find a set of optimal parameters for the model. A pre-trained model has been trained on a large dataset and sets a good basis, so we don’t need to find the optimal parameters from start, and the training process is accelerated.



### Step 3: Use the model to predict

Now it’s time to test your model on a new image.

```python
categ,idx,probs = learn.predict(PILImage.create('test-photo.jpg'))
print(f"This is a photo of {categ}, with a prbability of {probs[idx]:.4f}")
```



### Dig into `DataBlock`

You may suppose you’ll spend most of the time on the training step, things like model architecture, learning rate and so on. However, Jeremy said that `DataBlock` is the key thing you want to get familiar with as a beginner, because “the main thing you're going to be trying to figure out is **how do I get this data into my model**?” 

That’s true. When I tried to do a data competition or a little project, I often found the data cleaning and preparation were tricky. Sometimes I got stuck on this stage. 

So let’s see how to define `DataBlock` . As to computer vision problems, we need to answer the following questions:

- What kinds of data are the inputs(data) and outputs(label)?  Defined by `blocks`.
- Where is the input data? Defined by `get_items`.
- Do we need to apply something to the input? Defined by `get_x`.
- How to get the label? Defined by `get_y`.
- How to split train and valid data? Defined by `splitter`.
- Do we need to apply something on formed items? Defined by `item_tfms`, it’s often used to resize the images to be the same size.
- Do we need to apply something on formed batches? Defined by `batch_tfms`, it’s often used for data augmentation.

For example, in the fastai [example code](https://www.kaggle.com/code/jhoward/is-it-a-bird-creating-a-model-from-your-own-data), different categories of images  are stored in different folders for training, the dataloaders is constructed using the following code:

```python
dls = DataBlock(blocks=(ImageBlock,CategoryBlock),
               get_items=get_image_files,
               get_y=parent_label,
               splitter=RandomSplitter(valid_pct=0.2,seed=42),
               item_tfms=Resize(192)
               ).dataloaders(path,bs=32)
```

Here `(ImageBlock,CategoryBlock)` means that the input is image, and the output(label) is categorical variable. In this dataset, different categories of images are stored in different folders, so `get_y` defines to be `parent_label`. 

`blocks`, `get_items`, `get_y`, `splitter`, `item_tfms` are the parameters you’re going to set every time using `DataBlock`. 

We can set batch transform to the same dataset as follow:

```python
dls = DataBlock(blocks=(ImageBlock,CategoryBlock),
               get_items=get_image_files,
               get_y=parent_label,
               splitter=RandomSplitter(valid_pct=0.2,seed=42),
               item_tfms=RandomResizeCrop(192,min_scale=0.5)
               batch_tfms=aug_transforms()
               ).dataloaders(path,bs=32)
```

What’s more, the label defining methods may be different for different datasets. For example, in the PETS dataset, the label is defined by the lowercase or uppercase of the file name.

```python
path = untar_data(URLs.PETS)/"images"
def label_func(fname):
    return "cat" if fname.name[0].isupper() else "dog"
dls = DataBlock(blocks=(ImageBlock,CategoryBlock),
                get_items=get_image_files,
                get_y=label_func,
                splitter=RandomSplitter(valid_pct=0.2,seed=42),
                item_tfms=Resize(192)
               ).dataloaders(path)
```

If you look at the fastai example code, you may notice that it uses `dls=ImageDataLoaders.from_name_func()` to define `dataloaders`. It’s a factory method for some datasets. When I first learned it, I got a little confused and didn’t know which function to use, so my advice is to learn `DataBlock`, as it can be used for all kinds of datasets and saves your time.

For more details, you may read [fastai - Data block tutorial](https://docs.fast.ai/tutorial.datablock.html).
