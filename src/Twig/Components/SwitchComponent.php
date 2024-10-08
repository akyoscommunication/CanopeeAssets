<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent(name: 'switch', template: '@CanopeeAssets/components/switch.html.twig')]
final class SwitchComponent
{
    use DefaultActionTrait;
    use ComponentToolsTrait;

    #[LiveProp]
    public string $objectClass;

    #[LiveProp]
    public ?string $objectToSetClass = null;

    #[LiveProp(dehydrateWith: 'dehydrateObject', hydrateWith: 'hydrateObject', updateFromParent: true, onUpdated: 'toggle')]
    public mixed $object;

    #[LiveProp(dehydrateWith: 'dehydrateObject', hydrateWith: 'hydrateObjectToSet')]
    public mixed $objectToSet = null;

    #[LiveProp]
    public string $property;

    #[LiveProp]
    public ?string $setter = null;

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
    )
    {}

    #[LiveAction]
    public function toggle(): void
    {
        $this->object = $this->entityManager->getRepository($this->objectClass)->find($this->object);

        // on veut changer la valeur d'une propriété d'un objet
        if($this->objectToSet) {
            // si la propriété est déjà définie
            if($this->object->{'get'.ucfirst($this->property)}()) {
                // si la valeur de la propriété est égale à l'objet à définir
                if ($this->object->{'get' . ucfirst($this->property)}()->getId() === $this->objectToSet->getId()) {
                    $value = null;
                } else {
                    $value = $this->objectToSet;
                }
            } else {
                $value = $this->objectToSet;
            }
        } else {
            $value = !$this->object->{'is' . ucfirst($this->property)}();
        }

        $this->object->{($this->setter ?? 'set' . $this->property)}($value);
        $this->entityManager->getRepository($this->objectClass)->add($this->object, true);
        $this->emitUp('toggle_switch', ['object' => $this->object->getId(), 'property' => $this->property]);
    }

    public function dehydrateObject(mixed $object): mixed
    {
        return $object && $object->getId() ? $object->getId() : null;
    }

    public function hydrateObject(mixed $object): mixed
    {
        return $this->entityManager->getRepository($this->objectClass)->find($object);
    }

    public function hydrateObjectToSet(mixed $object): mixed
    {
        return $this->entityManager->getRepository($this->objectToSetClass)->find($object);
    }
}
