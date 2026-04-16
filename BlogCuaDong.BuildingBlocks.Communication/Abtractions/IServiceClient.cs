namespace BlogCuaDong.BuildingBlocks.Communication.Synchronous;

public interface IServiceClient
{
    Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request, CancellationToken cancellationToken = default);
    Task QueueAsync(INotification request, CancellationToken cancellationToken = default);
}