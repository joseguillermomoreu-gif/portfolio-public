<?php

declare(strict_types=1);

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__ . '/src')
    ->in(__DIR__ . '/tests')
    ->exclude('var')
    ->exclude('vendor')
    ->name('*.php');

$config = new PhpCsFixer\Config();

return $config
    ->setRules([
        '@PSR12'              => true,
        '@Symfony'            => true,
        'array_syntax'        => ['syntax' => 'short'],
        'ordered_imports'     => ['sort_algorithm' => 'alpha'],
        'no_unused_imports'   => true,
        'declare_strict_types' => true,
        'phpdoc_align'        => ['align' => 'vertical'],
        'phpdoc_order'        => true,
        'blank_line_after_opening_tag' => true,
        'concat_space'        => ['spacing' => 'one'],
        'trailing_comma_in_multiline' => ['elements' => ['arrays']],
        'single_quote'        => true,
        'no_superfluous_phpdoc_tags' => false,
    ])
    ->setFinder($finder)
    ->setRiskyAllowed(true)
    ->setUsingCache(true)
    ->setCacheFile(__DIR__ . '/var/.php-cs-fixer.cache');
