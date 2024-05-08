using Application.PipelineBehaviors;
using Application.Requests.Payloads;
using Application.Responses;
using Domain.AggregateModels.AccessAccountAggregate;
using MediatR;
using MediatR.Extensions.AttributedBehaviors;

namespace Application.Requests;

[MediatRBehavior(typeof(MimeTypeExtractionPipelineBehavior))]
[MediatRBehavior(typeof(PayloadValidationPipelineBehavior<UploadFileCommand, UrlBody>))]
public class UploadFileCommand : IRequest<IApplicationResponse>, IPayloadCommand<UrlBody>
{
    public AccessAccount Requester { get; }
    public UrlBody Payload { get; }

    public UploadFileCommand(UrlBody payload, AccessAccount owner)
        => (Payload, Requester) = (payload, owner);
}

public record UrlBody(string Url);
