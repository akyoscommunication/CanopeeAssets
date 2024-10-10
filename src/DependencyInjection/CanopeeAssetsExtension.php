<?php

namespace Akyos\CanopeeAssets\DependencyInjection;

use Exception;
use Symfony\Component\Config\Definition\ConfigurationInterface;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class CanopeeAssetsExtension extends Extension implements PrependExtensionInterface
{
    public function load(array $configs, ContainerBuilder $container): void
    {
        $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        try {
            $loader->load('services.yaml');
        } catch (Exception $e) {
//            dd($e);
        }
    }

    public function prepend(ContainerBuilder $container)
    {
        $bundles = $container->getParameter('kernel.bundles');

        if (isset($bundles['TwigComponentBundle'])) {
            $container->prependExtensionConfig('twig_component', [
                'defaults' => [
                    'AkyosCanopeeAssets\\Twig\\Components\\' => __DIR__ . '/../Resources/views/components',
                ],
            ]);
        }

        if (isset($bundles['WebpackEncoreBundle'])) {
            $container->prependExtensionConfig('webpack_encore', [
                'builds' => [
                    'canopee' => '%kernel.project_dir%/public/bundles/canopeeassets',
                ],
            ]);
        }

        if (isset($bundles['UXIconsBundle'])) {
            $container->prependExtensionConfig('ux_icons', [
                'default_icon_attributes' => [
                    'class' => 'c-icon',
                    'aria-hidden' => 'true',
                    'fill' => 'currentColor',
                ],
            ]);
        }

        if (isset($bundles['KnpPaginatorBundle'])) {
            $container->prependExtensionConfig('knp_paginator', [
                'template' => [
                    'pagination' => '@CanopeeAssets/theme/Pagination/sliding.html.twig',
                    'sortable' => '@CanopeeAssets/theme/Pagination/sortable_link.html.twig',
                ],
            ]);
        }
    }
}
