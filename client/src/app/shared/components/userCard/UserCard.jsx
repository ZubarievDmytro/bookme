import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const UserCard = ({ children, user, as, to, imConfig }) => {
  const img = {
    circular: true,
    floated: 'right',
    size: 'mini',
    location: 'insideContent',
    placeholderAvatar: 'https://simpleicon.com/wp-content/uploads/account.png',
    ...imConfig,
  };

  const { avatarUrl, name, description, profession } = user;

  return (
    <Card as={as} to={to}>
      {img.location !== 'insideContent' && (
        <Image src={avatarUrl || img.placeholderAvatar} wrapped />
      )}
      <Card.Content>
        {img.location === 'insideContent' && (
          <Image
            src={avatarUrl || img.placeholderAvatar}
            size={img.size}
            floated={img.floated}
            circular={img.circular}
          />
        )}
        <Card.Header content={name} />
        <Card.Meta content={profession} />
        <Card.Description content={description} />
      </Card.Content>
      {children}
    </Card>
  );
};

export default UserCard;
