import { ReactComponent as HelpIcon } from './svg/HelpIcon.svg';
import { ReactComponent as GithubIcon } from './svg/GithubIcon.svg';
import { List } from './List';
import { Typography } from './Typography';
import { Avatar } from './Avatar';
import { ListItem, ListItemText } from './ListItem';

export default {
  'single line': (
    <List>
      <ListItem>
        <HelpIcon />
        <ListItemText>Single-line</ListItemText>
      </ListItem>
      <ListItem className="active">
        <GithubIcon />
        <ListItemText>GitHub</ListItemText>
      </ListItem>
    </List>
  ),
  'with secondary': (
    <List>
      <ListItem>
        <HelpIcon />
        <ListItemText>
          <Typography>First line</Typography>
          <Typography variant="caption">Second line</Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <GithubIcon />
        <ListItemText>
          <Typography>GitHub</Typography>
          <Typography variant="caption">@kewka</Typography>
        </ListItemText>
      </ListItem>
    </List>
  ),
  'as button/link': (
    <List>
      <ListItem as="button" onClick={() => alert('Hello world')}>
        <HelpIcon />
        <ListItemText>Alert</ListItemText>
      </ListItem>
      <ListItem as="a" href="https://github.com/kewka">
        <GithubIcon />
        <ListItemText>
          <Typography>GitHub</Typography>
          <Typography variant="caption">@kewka</Typography>
        </ListItemText>
      </ListItem>
    </List>
  ),
  'with avatar': (
    <List>
      <ListItem>
        <Avatar src="https://picsum.photos/200" />
        <ListItemText>Nikita Korshunov</ListItemText>
      </ListItem>
      <ListItem>
        <Avatar src="https://picsum.photos/300" />
        <ListItemText>
          <Typography>Nikita Korshunov</Typography>
          <Typography variant="caption">Status: 👋</Typography>
        </ListItemText>
      </ListItem>
    </List>
  ),
};
