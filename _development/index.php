<?php 
// start variables

	//filenames and titles
		$currentFile = basename(__FILE__);
		$parts = Explode('.', $currentFile);
		//foreach ($parts as $part) { echo $part . '<br>'; }
		//index.php is broken into array: [0][1] AKA [index][php]
		//so count([index][php]) is 2. $title = $parts[2-2] = $parts[0] = 'index'.
		$title = $parts[count($parts) - 2];
		//for "page two", the space will be replaced with underscore
		$title = str_replace(' ', '_', $title);//replace spaces with underscores

		
	
// end variables

// start include HTML partial pages
	include_once 'partials/header.html';
	include_once 'partials/' . $title . '.html';
	include_once 'partials/footer.html';
// end include HTML partial pages
?>