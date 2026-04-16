using BlogCuaDong.BuildingBlocks.Communication.Synchronous;
using MediatR;

namespace BlogCuaDong.BuildingBlocks.Communication;

public class InMemoryServiceClient(IMediator mediator) : IServiceClient
{
    public Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request, CancellationToken cancellationToken = default)
    {
        return mediator.Send(request, cancellationToken);
    }

    public Task QueueAsync(INotification request, CancellationToken cancellationToken = default)
    {
        return mediator.Publish(request, cancellationToken);
    }
}