<?php

namespace Akyos\CanopeeAssets\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CanopeeAssetsTwigExtension extends AbstractExtension
{

    public function getFunctions(): array
    {
        return [
            new TwigFunction('class_exists', 'class_exists'),
        ];
    }
}
