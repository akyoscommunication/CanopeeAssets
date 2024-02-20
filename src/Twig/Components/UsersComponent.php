<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('users', template: '@CanopeeAssets/components/users.html.twig')]
final class UsersComponent
{
    public array $collaborators = [];

    public int $max = 7;
}
