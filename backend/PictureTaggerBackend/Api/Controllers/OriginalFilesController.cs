using System.Diagnostics;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("files/original")]
public class OriginalFilesController : BaseController
{
    private readonly IMediator _mediator;

    public OriginalFilesController(IMediator mediator)
        => _mediator = mediator;

    // [Authorize]
    [HttpPost, Route("")]
    public async Task<IActionResult> Upload([FromForm] IFormFile? file)
    {
        throw new NotImplementedException();
    }

    // [Authorize]
    [HttpGet, Route("")]
    public async Task<IActionResult> GetList([FromQuery] object payload)
    {
        throw new UnreachableException();
    }

    // [Authorize]
    [HttpDelete, Route("${id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        throw new UnreachableException();
    }
}