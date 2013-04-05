/*---------------------------------------------------------------------------------------------------------------------------------
 * 
 *  Static Website Generator / Buildscript!!! :)
 *  - By Lauren
 *
 *	Disclaimer:
 *	- Script is very basic:
 *		- File and directory names that get written to the /_production folder are manually entered in the /_buildscript/index.php file
 *  
 *  Description/Purpose: 
 *
 *  - Develop website with PHP in "_development" directory
 *  - Modify/Run index.php buildscript in _buildscript directory
 *  	- To write static HTML website to "_production" directory
 *  
 *
 *  Details - About File Structure: 
 *  
 *  	/_buildscript
 *  		index.php
 *  			-Run this file (ie. navigate to localhost/workspace/working_files/_buildscript/index.php)
 *  			-Check the $base_url value before running
 *  	/_production
 *  			-This is where the built files go!!! :)
 *  
 *  	These are the development files/folders:
 *
 *  	/_development
 *  	  	/img
 *  	  	/partials
 *  	  	  	header.html
 *  	  	  	footer.html
 *  	  	  	file_name_1.html
 *  	  	  	  	-These are the html pieces that are combined by .php files in the root
 *  	  	/scripts
 *  	  	/styles
 *  
 *  	  	file_name_1.php
 *  	  	  	-Assembles the files in /partials folder to create 1 webpage
 *
 *	REQUIREMENTS:
 *		- Apache server with PHP version >= PHP5 (ie. LAMP/MAMP/WAMP)
 *		- NOTE the location/path where you put these files in your website.
 *			- You WILL NEED to change the $base_url variable in /_buildscript/index.php to that location/path.
 *  
 *	TROUBLESHOOTING:
 *		- If you run /_buildscript/index.php and see a bunch of permissions errors, you can run chmod -R 777 * (not just 755) on the folder to fix it
 *
 *---------------------------------------------------------------------------------------------------------------------------------*/