<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('users', template: '@CanopeeAssets/components/users.html.twig')]
final class UsersComponent
{
    public array $userAccessRights = [];

    public int $max = 7;
}
