---
title: "Beginner’s guide to shell commands"
date: 2023-01-04T18:58:19+08:00
draft: false
tags:
- Shell Command
- Linux
categories:
- Programming
---

Maybe you just began to use Linux, or maybe you need to run programs in Terminal/Shell, in both cases, you need a command reference or cheat sheet. Here’s what you’re looking for, a list of some basic commands with examples. 

<!--more-->





### 1. Work on Directories (or Folders in Windows)

#### ls : list

`ls` : to list all the directories/files in the current directory(folder).

#### pwd : present working directory

`pwd`: to show the current file path.

#### cd : change directory

`cd folder_name`: to change directory to the directory(folder).

For example, `cd folder1`  changes the directory to the subfolder “folder1” in the current folder.

Three special signs for directory:

- `.` : current directory

- `..` : parent directory, thus `cd ..` means changing to the parent directory.

- `~` : home directory, thus `cd ~` means changing to the home directory. We can also type `cd` for the same result.

#### mkdir : make a directory 

`mkdir folder_name` : to make a new directory (folder).

#### rm -r : remove

`rm -r folder_name ` : to remove the whole directory (folder) ( “-r” means recursively).

> **Warning**:  In UNIX, when you `rm` a file or directory, it's gone. There is no Recycle bin or Trash for you to "undo" `rm`, so please think twice before you use it.



### 2. Work on Files 

#### echo : similar to “print”  

`echo content` : to print the content on the screen. 

`echo content>>filename.filetype`: to write to the file.

#### cat : display

`cat filename.filetype` : to display the content of the file.

#### touch : create a file

`touch filename.filetype`: to create a new empty file.



The following example uses these three commands. First we use `echo` to print “hello” on the screen :

```bash
>echo "hello!"
hello!
```

Then we create a new directory named “example”, and use `touch` to create a new txt file named “ex01” in it. 

```bash
>mkdir example
>cd example
/example> touch ex01.txt
/example> ls
ex01.txt
```

When we type `cat ex01.txt`, the output is nothing, because “ex01.txt” is an empty file.

```bash
/example> cat ex01.txt
```

We can use `echo`  command to write something into “ex01.txt” :

```bash
/example> echo "hello">>ex01.txt
```

Now using `cat ` command, we’ll see the content of “ex01.txt”:

```bash
/example> cat ex01.txt
hello
```

We can also write many times, the content will be added to the file :

```bash
/example> echo "Let us learn Python.">>ex01.txt
/example> cat ex01.txt
hello
Let us learn Python.
```



#### mv : move

`mv source_path dest_path` ：to move the file/directory from the source_path to the dest_path.

There are two ways of using `mv`:

1.`mv source_file/directory dest_directory` : to **move** the source file/directory to the dest_directory 

2.`mv source_file dest_file` : to **rename** the source_file,  now the file name is dest_file. If dest_file has already existed, it will be overwritten as the content of the source file.

Let’s see an example. Here we still use the “example” folder in the previous example, with “ex01.txt” inside it. 

```bash
/example> ls
ex01.txt
```

First we create a new folder named “sub_example” as the dest_directory. 

```bash
/example> mkdir sub_example
/example> ls
ex01.txt  sub_example/
```

The folder “sub_example” is empty now:

```bash
/example> ls sub_example
```

(1) use `mv source_file/directory dest_directory` to move a file :

```bash
/example> mv ex01.txt sub_example
```

Now the file “ex01.txt” is in the subfolder “sub_example”, not in the folder “example”:

```bash
/example> ls
sub_example/
/example> ls sub_example
ex01.txt
```



(2) use `mv source_file dest_file` to rename a file :

```bash
/example> cd sub_example
.../sub_example> mv ex01.txt ex02.txt
```

Here the file name is changed from “ex01” to “ex02”. 

```bash
.../sub_example> ls
ex02.txt
.../sub_example> cat ex02.txt
hello
Let us learn Python.
```



You may wonder: what will happen if the dest_file has already existed? 

We create a file “ex03.txt” with the content “another txt file”.

```bash
.../sub_example> touch ex03.txt
.../sub_example> echo "another txt file">>ex03.txt
.../sub_example> cat ex03.txt
another txt file
```

After typing `mv ex02.txt ex03.txt`, there will be a prompt to check if you really want to overwrite dest_file “ex03.txt”.

```bash
.../sub_example> mv ex02.txt ex03.txt
mv: overwrite 'ex03.txt'? y
```

 If you type “y”, “ex03.txt” will be overwritten as the  content of “ex02.txt”.

```bash
.../sub_example> ls
ex03.txt
.../sub_example> cat ex03.txt
hello
Let us learn Python.
```



#### cp : copy

`cp file/directory dest_directory`: to copy the file/directory to the dest_directory.

> For `mv`/ `cp` command, if the dest_directory is the current directory,  we can write `.`  instead.

#### rm : remove

`rm file_name`: to remove a single file. Here only a file is removed, so `-r` is not needed.

#### unzip

`unzip file_name.zip` : to unzip the .zip file.

### 3. Miscellaneous

`man command_name`: to display manual pages for the command.



**Reference**

[Lab 0: Getting Started | CS 61A Fall 2020](https://inst.eecs.berkeley.edu/~cs61a/fa20/lab/lab00/)

[UNIX tutorial | CS 61A Fall 2020](https://inst.eecs.berkeley.edu/~cs61a/fa20/articles/unix.html)

[touch command in Linux with Examples - GeeksforGeeks](https://www.geeksforgeeks.org/touch-command-in-linux-with-examples/)



