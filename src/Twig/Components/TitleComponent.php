<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('title', template: '@CanopeeAssets/components/title.html.twig')]
final class TitleComponent
{
    public string $tag = 'h1';
}
