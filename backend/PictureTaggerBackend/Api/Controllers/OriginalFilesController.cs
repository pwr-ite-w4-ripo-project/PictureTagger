using Application.Requests;
using Application.Requests.Payloads;
using Domain.AggregateModels;
using Domain.AggregateModels.ProcessedFileAggregate;
using Domain.SeedWork.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("files/original")]
public class OriginalFilesController : BaseController
{
    private readonly IMediator _mediator;

    public OriginalFilesController(IMediator mediator)
        =>  _mediator = mediator;

    // [Authorize]
    [HttpPost, Route("")]
    public async Task<IActionResult> Upload([FromBody] UrlBody payload)
    {
        UploadFileCommand request = new(payload, GetRequester());
        
        var response = await _mediator.Send(request);

        return MapResponse(response);
    }
    
    // [Authorize]
    [HttpGet, Route("")]
    public async Task<IActionResult> GetList([FromQuery] FilePaginationPayload payload)
    {
        GetOriginalFileListQuery request = new(payload, GetRequester());

        var response = await _mediator.Send(request);

        return MapResponse(response);
    }
    
    // [Authorize]
    [HttpDelete, Route("${id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeleteOriginalFileCommand request = new(id, GetRequester());

        var response = await _mediator.Send(request);
        
        return MapResponse(response);
    }

    [HttpGet, Route("index")]
    public async Task<List<ProcessedFile>> Index([FromServices] IFileRepository<ProcessedFile> r)
    {
        var (c, l) = await r.GetManyAsync(GetRequester(), QueryMediaTypes.All, builder => builder.ApplyLimit(10).ApplyOrder("name:asc").ApplyOffset(0));
        return l;
    }
}
