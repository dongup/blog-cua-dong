using BlogCuaDong.BuildingBlocks.Communication.Synchronous;
using MediatR;

namespace BlogCuaDong.BuildingBlocks.Communication;

public sealed class InMemoryEventBus(IMediator mediator) : IEventBus
{
    public Task PublishAsync(INotification notification, CancellationToken cancellationToken)
    {
       return mediator.Publish(notification, cancellationToken);
    }
}