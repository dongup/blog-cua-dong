namespace BlogCuaDong.BuildingBlocks.Communication.Synchronous;

public interface IServiceClient
{
    Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request);
    Task NotifyAsync(INotification request);

}