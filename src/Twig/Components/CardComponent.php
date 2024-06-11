<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('card', template: '@CanopeeAssets/components/card.html.twig')]
final class CardComponent
{
    public string $tag = 'div';
}
