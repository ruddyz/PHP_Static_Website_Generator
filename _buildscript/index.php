<?php 

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

/*START HELPER functions*/
	// http://stackoverflow.com/questions/2050859/copy-entire-contents-of-a-directory-to-another-using-php
	function recurse_copy($src,$dst) {
		$dir = opendir($src);
		@mkdir($dst);
		while(false !== ( $file = readdir($dir)) ) {
			if (( $file != '.' ) && ( $file != '..' )) {
				if ( is_dir($src . '/' . $file) ) {
					recurse_copy($src . '/' . $file,$dst . '/' . $file);
				}
				else {
					copy($src . '/' . $file,$dst . '/' . $file);
				}
			}
		}
		closedir($dir);
	}
/*END HELPER functions*/

/*START variables*/
	$base_url = 'http://localhost/workspace/_Templates/PHP-Static-Website-Generator/';
	$dev_url = $base_url . '_development/';
	$build_relative_path = '../_production/';
	
	//page names
	$pg_1 = 'index';
	//$pg_2 = 'page-2';
	
	//url prefix (no extension! : ie. .php)
	$pg_1_url_pfx = $dev_url . $pg_1;
	//$pg_2_url_pfx = $dev_url . $pg_2;

/*END variables*/

/*START FUNCTIONS*/

	
	//Get file contents: file_get_contents and file_put_contents relies on PHP5
	$page_1_content = file_get_contents( $pg_1_url_pfx . '.php' , true);
	//$page_2_content = file_get_contents( $pg_2_url_pfx . '.php' , true);
	//echo $page_1_content;
	
	//in HTML content, change ALL instances of ".php" to ".html"
	$page_1_content = str_replace( '.php', '.html', $page_1_content );
	//$page_2_content = str_replace( '.php', '.html', $page_2_content );
	
	//echo $build_relative_path . $pg_1;
	
	
	//Write files
	file_put_contents( $build_relative_path . $pg_1 . '.html' , $page_1_content);
	//file_put_contents( $build_relative_path . $pg_2 . '.html' , $page_2_content);
	//echo $build_relative_path . $pg_1;
	
	//copy .htaccess
	
	copy('../_development/.htaccess', "../_production/.htaccess" );
	
	
	//get htaccess file
	//$htaccess_content = file_get_contents( $base_url . '.htaccess' );
	//file_put_contents( $build_relative_path . '.htaccess', $htaccess_content );
	
	//copy img, scripts, and styles directories into production directory
	recurse_copy( '../_development/img', '../_production/img' );
	recurse_copy( '../_development/scripts', '../_production/scripts' );
	recurse_copy( '../_development/styles', '../_production/styles' );
	
/*END FUNCTIONS*/
	
?>