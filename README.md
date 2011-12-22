# stopcensorship.js #

(C) 2011 by Doug Martin ([@dougmartin][1])

Licensed under the MIT license: [http://www.opensource.org/licenses/mit-license.php][2]

## What is this? ##

Use this script on your site to protest censorship of the Internet.  

After the page is loaded the script randomly censors text on the page by replacing the text with black bars.  It also places
a black bar at the top of the page with a link to http://americancensorship.org/.  Viewers can remove censoring for the 
current session by clicking on the "Remove this" link.

## Example ##

Here is an example of Hacker News censored using the script:

[http://dougmart.in/stopcensorship/test.html][3]

## Usage ##

First download script from here: [https://github.com/dougmartin/Stop-Censorship/zipball/master][4]

and then include the following script tag anywhere on your page:

    <script type="text/javascript" src="stopcensorship.js"></script>

You can alternativly include a version hosted on [cdnjs.com][5]:

    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/sopa/1.0/stopcensorship.js"></script>

## Wordpress Plugin (new) ##

Christopher Davis created a Wordpress plugin to automatically add the script to your blog.  To use it just
unzip the files into a new "stopcensorship" folder in your plugins folder and then activate it in your
Wordpress admin.
	
  [1]: https://twitter.com/#!/dougmartin
  [2]: http://www.opensource.org/licenses/mit-license.php
  [3]: http://dougmart.in/stopcensorship/test.html
  [4]: https://github.com/dougmartin/Stop-Censorship/zipball/master
  [5]: http://cdnjs.com
