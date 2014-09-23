<?php

global $rfExampleConfig;
$rfExampleConfig = array (
	'mounts' => array (
		'jsrf' => __DIR__.'/../../jsrf/src/',
		'jsrfBuild' => __DIR__.'/../../build/js/',
		'phprfBuild' => __DIR__.'/../../build/php/razorflow_php/static/rf/',
		'tmp' => __DIR__.'/../../build/tmp/'
	),
	'devStaticPaths' => array (
		'jsrf' => __DIR__.'/../../jsrf/src/',
		'docs' => __DIR__.'/../../docs/build/docs/',
	),
	'devLibPaths' => array (
		'rfphp' => __DIR__.'/../../wrappers/phprf/src/razorflow.php'
	),
	'prodLibPaths' => array (
		'rfphp' => __DIR__.'/../lib/razorflow_php/razorflow.php',
		'rfStatic' => '/lib/razorflow_php/static/rf/'
	),
	'examplePaths' => array(
		'js' => array (
			'demos' => __DIR__."/../src/js/demos/",
			'examples' => __DIR__."/../src/js/examples/",
			'testcases' => __DIR__."/../src/js/testcases/",
			'tests' => __DIR__."/../src/js/tests/",
			'bench' => __DIR__."/../src/js/benchmark/"
		),
		'php' => array (
			'demos' => __DIR__."/../src/php/demos/",
			'examples' => __DIR__."/../src/php/examples/",
			'testcases' => __DIR__."/../src/php/testcases/",
			'tour' => __DIR__."/../src/php/tour/"
		),
		'html' => array (
			'demos' => __DIR__."/../src/html/demos/",
			'examples' => __DIR__."/../src/html/examples/",
			'testcases' => __DIR__."/../src/html/testcases/"
		)
	)
);