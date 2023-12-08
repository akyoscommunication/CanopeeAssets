<?php

namespace Akyos\CanopeeAssets\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Vich\UploaderBundle\Twig\Extension\UploaderExtensionRuntime;

class CustomFileType extends AbstractType
{
    public function __construct(
        private readonly UploaderExtensionRuntime $uploaderExtensionRuntime,
        private readonly UrlGeneratorInterface $urlGenerator,
    ){}

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        parent::buildView($view, $form, $options);
        $parentClass = $form->getParent()->getData();

        if ($parentClass?->getId() && $options['show_preview']) {
            $value = $form->getData();
            $path = $this->uploaderExtensionRuntime->asset($parentClass, $options['fake_upload_path']);
            $view->vars['file'] = [
                'uniqid' => 'file_' . $parentClass->getId() . '_' . $options['fake_upload_path'],
                'name' => $value,
                'path' => $path,
                'url' => $path ? $this->urlGenerator->generate('app.stream_document', ['file' => $path]) : null,
            ];
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => null,
            'fake_upload_path' => null,
            'show_preview' => true,
            'attr' => [
                'data-customfile-target' => 'input',
                'data-live-ignore' => 'true',
            ],
        ]);
    }

    public function getParent(): string
    {
        return TextType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'file';
    }
}
