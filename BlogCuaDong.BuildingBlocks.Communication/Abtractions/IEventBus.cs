namespace BlogCuaDong.BuildingBlocks.Communication.Synchronous;

public interface IEventBus
{
    Task PublishAsync(INotification notification, CancellationToken cancellationToken);
}