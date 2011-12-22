<?php
/*
Plugin Name: Stop Censorsihp
Author: Doug Martin
Description: Adds Doug Martin's stopcensorship.js to your WordPress website.
*/

add_action( 'wp_enqueue_scripts', 'stop_censorship_enqueue_scripts' );
function stop_censorship_enqueue_scripts()
{
    wp_enqueue_script(
        'stop-censorship',
        plugin_dir_url( __FILE__ ) . 'stopcensorship.js',
        array(),
        NULL,
        true
    );
}
