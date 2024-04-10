using System.Diagnostics;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("files/processed")]
public class ProcessedFilesController : BaseController
{
    private readonly IMediator _mediator;

    public ProcessedFilesController(IMediator mediator)
        => _mediator = mediator;

    // [Authorize]
    [HttpGet, Route("{id:guid}")]
    public async Task<IActionResult> Download([FromQuery] Guid id)
    {
        throw new UnreachableException();
    }

    // [Authorize]
    [HttpGet, Route("")]
    public async Task<IActionResult> GetList([FromQuery] object payload)
    {
        throw new UnreachableException();
    }

    // [Authorize]
    [HttpDelete, Route("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        throw new UnreachableException();
    }
}