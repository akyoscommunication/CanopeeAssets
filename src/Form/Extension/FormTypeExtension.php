<?php

namespace App\Form\Extension;

use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FormTypeExtension extends AbstractTypeExtension
{
	public static function getExtendedTypes(): iterable
	{
		return [FormType::class];
	}

	public function configureOptions(OptionsResolver $resolver): void
	{
		parent::configureOptions($resolver);

		$resolver->setDefaults([
			'help_info' => null
		]);
	}

	public function buildView(FormView $view, FormInterface $form, array $options): void
	{
		parent::buildView($view, $form, $options);

		$view->vars = array_replace($view->vars, [
			'help_info' => $options['help_info']
		]);
	}
}
