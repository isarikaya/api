export default function userRepository(repository) {
  const findById = (id) => repository.findById(id)

  return {
    findById,
  }
}
