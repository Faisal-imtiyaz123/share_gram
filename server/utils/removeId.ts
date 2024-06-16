import { ObjectId } from "mongodb"

export function removeId<T>(object:(T & {_id:ObjectId})):T{
    const { _id, ...rest } = object;
    return rest as T;
}