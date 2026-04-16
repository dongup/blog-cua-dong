namespace BlogCuaDong.BuildingBlocks.Communication;

public interface IRequest<out TResult> : MediatR.IRequest<TResult>
{
    
}