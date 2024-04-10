using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public abstract class BaseController : Controller
{
    protected string GetRequester() => "todo@email.dev"; // TODO auth & OAuth

    protected IActionResult MapResponse(object response)
    {
        throw new NotImplementedException();
    }

    private IActionResult MapSuccessfulResponse(object response)
    {
        throw new NotImplementedException();
    }

    private IActionResult MapUnsuccessfulResponse(object response)
    {
        throw new NotImplementedException();
    }

    private static ObjectResult Forbidden(object payload)
        => new(payload) { StatusCode = StatusCodes.Status403Forbidden };
}