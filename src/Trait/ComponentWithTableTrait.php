<?php

namespace Akyos\CanopeeAssets\Trait;

use Knp\Component\Pager\Pagination\PaginationInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\Service\Attribute\Required;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\TwigComponent\Attribute\ExposeInTemplate;

trait ComponentWithTableTrait
{
    #[ExposeInTemplate(name: 'table', getter: 'getTable')]
    private ?string $table = null;

    public ?string $trTemplate = null;

    public bool $paginate = true;
    private int $page = 1;

    public PaginatorInterface $paginator;
    public RequestStack $request;

    /**
     * @internal
     */
    #[Required]
    public function setRequest(RequestStack $request): void
    {
        $this->request = $request;
    }

    /**
     * @internal
     */
    #[Required]
    public function setPaginator(PaginatorInterface $paginator): void
    {
        $this->paginator = $paginator;
    }

    abstract protected function getElements(): PaginationInterface;

    abstract protected function getTHeader(): iterable;

    public function getTable(): false|string
    {
        return $this->render('@CanopeeAssets/components/table/table.html.twig', [
            'elements' => $this->getElements(),
            'trTemplate' => $this->trTemplate,
            'tHeader' => $this->getTHeader(),
            'paginate' => $this->paginate,
        ])->getContent();
    }

    #[LiveAction]
    public function toPage(#[LiveArg] int $page): void
    {
        $this->page = $page;
    }
}
