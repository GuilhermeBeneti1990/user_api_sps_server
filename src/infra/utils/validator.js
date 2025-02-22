export default async function userExists(id, repository) {
    const user = await repository.findById(id);

    if(!user) {
        return null
    }

    return user;
}