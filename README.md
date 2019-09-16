# Eleventy Basic Template

* [Status](#status)
* [Setting Up](#setting-up)
* [Developing in Eleventy](#developing-in-eleventy)
* [Layouts](#layouts)
  + [Head.html](#head.html)
  + [Pages.md](#pages.md)
* [Styling](#styling)
* [Javascript](#javascript)
* [Data](#data)
  + [main.json](#main.json)
  + [content](#content)
* [CMS](#cms)
* [Deployment](#deployment)
  + [CMS config](#cms-config)
  + [S3](#s3)
  + [GitHub](#github)

## Status

| | |
| --- | --- |
| __Huidige versie__ | 1.0 |
| __Readme updated__ | 2 August 2019

## Setting Up

* Make a local copy of this project (changing the folder's name if needed) and run

`npm build` 

* The project will install all the needed packages such as eleventy, a sass compiler, a file-watcher (nodemon) for developing, a markdown renderer.

If you plan on using this boilerplate for a project fueled by data from www.cmsmetlef.be you will also need to install the serverless-cms-sync cli globally on your machine. Clone the serverless-cms-cli repository and run

`npm link` 

inside the package.

## Developing in Eleventy

The boilerplate offers a number of starter scripts to use while you are developing your project. The most useful ones are:

* `npm run start` : using local data, will call 'eleventy build' generating your static website, compiles your sass, and then serves your project (standard location: localhost:8080). Starts a couple of watchers that look out for changes in your eleventy files and sass. You can qualify additional files/folders to be watched in .eleventy.js or the nodemonConfig in package.json if needed.

* `npm run prod` : Will fetch data from the cms. To use this you will need to edit this starter script in package.json to include the configId you have declared for the project in the cms (replace '***' with your configId). Then runs the regular starter script with this new data.

Eleventy automatically finds the folders and files that it needs to make up a static website including this README.
(If you don't want to include a README in your static site, add `README.md` to a file with the name `.eleventyignore` at the root level of this boilerplate.)

## Layouts

This boilerplate comes with one standard starting page: index.md.
Currently, this page has no content, however it does extend to the standard layout: layout/default.html, located in the _includes/layout/ folder.
This page will function as your homepage if you have no other content with 'index' as its file name (not recommended).

You can add/change/chain layouts as needed.

Layouts make use of sections, so that components can be reused across different layouts. You can add/edit these sections in the _includes/sections folder.

### Head.html

The boilerplate provides a basic head using data from the cms, so make sure you include this data in your 'main' content form in the cms. A few fallbacks have been provided, but for better SEO dynamic data is expected here.

### Pages.md

This boilerplate assumes you will have at least one content type linked to your config (that is not 'main') and calls it 'page'. Pages.md will build static html pages from all content of the type 'page' that you have provided in the CMS.

Make sure to include the following fields in the form for your pages:

* file: this will be the filename eleventy saves the page under. Include a page with 'index' as its filename to use it as your home/starting page.

* menuTitle: if you wish to use the navigation.html section of this boilerplate, which automatically adds and 'active' class to the currently active tab, include this field.

* content: the body of your page, can be written in markdown.

You can add more fields as needed, and call them in your template (layouts and sections alike) as needed using liquid includes ( `{{page.newField}}` )

## Styling

This boilerplate uses a custom sass compiler.
Currently the project looks in /sass/main.scss for all imports and styling of your site, and compiles a css file in /assets/css/main.css, the file that head.html is currently looking for its stylesheet.

You can change this configuration in sass.config.js if needed.

## Javascript

This boilerplate is meant for javascript-light projects, so currently does not minify or bundle the code it fetches from 'assets/scripts/index.js'.

If you intend to use a lot of javascript in your project, you should consider making use of the custom webpack-layer by adding a webpack.config.js to the root of your project, and including the webpack-layer in your package.json so you can run `webpack` locally to see your code.

## Data

### Main.json

In the CMS, you should provide a content-type called 'main' to include site-wide data (such as the website's title and description). You can expand this with repeated content like contact-information, disclaimers, footer-content etc.

### Content

When your project runs cms-sync, it will fetch all data from all different types with the same configId as the one you provided in your `npm run prod` script from fields with a 'doc.' prefix.

For example, a piece of content provided in the CMS that looks like this:

``` json
[
  {
    "_id" : "LKPQqHvYg8isvACpR",
    "configId" : "eleventy-boilerplate",
    "type" : "page",
    "label" : "homepage (nl)",
    "doc": {
      "file": "index",
      "menuTitle": "Home",
      "content": "# Homepage\n\n

## Welcome to the eleventy boilerplate\n\nContent"

    }
  }
]
```

Will show up in this project's _data folder as:

``` json
[
  {
    "file": "index",
    "menuTitle": "Home",
    "content": "# Homepage\n\n

## Welcome to the eleventy boilerplate\n\nSome content"

  },
]
```

## CMS

* Add a new client/config and provide a unique _id that will be your configId for this project

* Add the content types you want. You can include as many types as you'd like, but to immediately make use of this boilerplate you only need the content types 'main' and 'page'.

* Create a form for each of your content types. This form always needs the same elements:
  + _id: this will be automatically generated by the CMS
  + configId: the _id of this project (you can select this from a dropdown menu when creating your forms in the cms' admin section)
  + type: the content type this form is for
  + elements: the elements of your form.

  ! __important__:
  If you expect the data returned from these fields to show in your eleventy project, make sure to include the 'doc.' prefix in the elements' name.
  e.g.
  

``` json
  {
    "name": "doc.content",
    "label" : "Content",
    "type" : "textarea"
  }
  ```

## Deployment

Provide the following three configurations to be able to deploy your project from the CMS's deploy page:

### CMS- Config

To deploy your project, make sure to provide the following elements to your config in the CMS:

``` json
{
  "_id" : "eleventy-boilerplate",
  "name" : "Eleventy Boilerplate",
  "framework" : "eleventy",
  "environments" : [
    {
      "name" : "production",
      "git" : {
        "branch" : "production"
      },
      "s3": {
        "bucket" : "production.eleventyboilerplate.be",
        "stopOnErr" : true,
        "cache" : false
      }
    }
  ],
  "git" : {
    "url" : "ssh://git@github.com/LEFapps/eleventy-basic-template.git",
    "repository": "eleventy-basic-template",
    "private_key" : "---PRIVATE KEY---",
  },
  "content" : [
    {
      "type" : "main",
      "multiple" : false
    },
    {
      "type" : "page",
      "multiple" : true
    }
  ]
}
```

### S3

* Create a new bucket for your project.

* In your bucket's properties, turn 'static website hosting' on, make note of the url, this is the starting point of your website.

* Go to Permissions -> Bucket Policy to set your bucket to public. E.g:

``` json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::production.eleventyboilerplate.be/*"
        }
    ]
}
```

* Go to AWS's IAM service and navigate to Roles -> serverless-cms -> serverless-cms-s3access. Edit this policy to allow the cms access to your new bucket.

!important: to prevent errors, add both notations of your arn to this file under Resource:

``` json
"arn:aws:s3:::production.eleventyboilerplate.be",
"arn:aws:s3:::production.eleventyboilerplate.be/*"
```

### GitHub

* Navigate to your project in GitHub and go to Settings > Deploy Keys

* Generate a new key pair. The private key is the key you need to provide to the config in the CMS.

* Go to Settings > Webhooks if you would like for your project to be deployed when you push new code to your chosen published branch.

Add the url to the eleventy-compile API to start using this webhook.

