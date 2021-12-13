import {Box} from '../../../generator/_components';


export default function FormFileUpload() {
  return (
    <Box
      title="Add new file"
      padding
    >
      <form method="post" action="/upload" enctype="multipart/form-data">
        <input type="file" name="file"/>
        <input type="submit" value="Submit"/>
      </form>
    </Box>
  );
}
