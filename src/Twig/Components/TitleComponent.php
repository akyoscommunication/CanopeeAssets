<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('title', template: 'components/title.html.twig')]
final class TitleComponent
{
    public string $tag = 'h1';
}
