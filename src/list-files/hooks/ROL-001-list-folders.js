/*
Assuming hooks to be named to story titles - this hook would add folders to response and set their type to folder
*/

export const listFolders = commonPrefixes => {
  if (!commonPrefixes) {
    return [];
  }
  return commonPrefixes.map(folder => {
    folder.name = folder.Prefix;
    folder.type = "folder";
    return folder;
  });
};
