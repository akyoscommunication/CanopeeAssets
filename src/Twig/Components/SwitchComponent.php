<?php

namespace App\Twig\Components;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent(name: 'switch', template: 'components/switch.html.twig')]
final class SwitchComponent
{
    use DefaultActionTrait;

    #[LiveProp(dehydrateWith: 'dehydrateObject')]
    public mixed $object;

    #[LiveProp]
    public string $objectClass;

    #[LiveProp]
    public string $property;

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    #[LiveAction]
    public function toggle(): void
    {
        $this->object = $this->entityManager->getRepository($this->objectClass)->find($this->object);

        $this->object->{'set'.$this->property}(!$this->object->{'is'.ucfirst($this->property)}());
        $this->entityManager->getRepository($this->objectClass)->add($this->object, true);
    }

    public function dehydrateObject(mixed $object): mixed
    {
        return $object && $object->getId() ? $object->getId() : null;
    }
}
