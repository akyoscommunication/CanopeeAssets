<?php

namespace Akyos\CanopeeAssets\Form;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class ImpersonateType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('_switch_user', EntityType::class, [
                'class' => User::class,
                'choice_label' => function (User $user) {
                    $userCanopee = $user->getUserCanopee();
                    if($userCanopee){
                        return $userCanopee->familyName . ' ' . $userCanopee->givenName . ' - (' . $userCanopee->email .')';
                    }
                },
                'choice_value' => function (User $entity = null) {
                    return $entity ? $entity->getUuid() : '';
                },
                'constraints' => [
                    new NotBlank(),
                ],
                'label' => false,
                'placeholder' => 'Sélectionnez un utilisateur',
                'autocomplete' => true
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
        ]);
    }

    public function getBlockPrefix(): string
    {
        return '';
    }
}
