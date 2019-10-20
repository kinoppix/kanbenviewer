import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const canbennes_imgs = {
  "カンベンヌ怒り": "canb_anger.png",
  "カンベンヌ悲しみ": "canb_sad.png",
  "カンベンヌ照れ": "canb_shy.png",
  "カンベンヌ通常": "canb.png",
  "カンベンヌ驚き": "canb_surprised.png",
  "カンベンヌ笑顔": "canb_happy.png",
}


function AdviceRow(props) {
  const {advice} = props
  return (
          <Fragment key={"advice_"+advice[0]}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={advice[12]} src={'./img/' + canbennes_imgs[advice[12]]} style={{ margin: "10px", width: "60px", height: "60px" }} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    {props.checkpoint && (
                      <Chip label={props.checkpoint} color="primary" />
                    )}
                    {advice[7] !== "共通" && (
                      <Chip label={advice[7]} />
                    )}
                    {advice[6] !== "共通" && (
                      <Chip label={advice[6]} />
                    )}
                    {advice[9] && (
                      <Chip label={"ピンポイント" + advice[9] + "日目"} />
                    )}
                    {advice[10] && (
                      <Chip label={"連続" + advice[10] + "日"} />
                    )}
                  </>
                }
                secondary={advice[13]}
                secondaryTypographyProps={{variant:"body1", color:"textPrimary"}}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>

  )
}
export default AdviceRow