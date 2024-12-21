import 'server-only';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { IconInfoHexagon } from '@tabler/icons-react';
import { ReactNode } from 'react';

type Content = {
  label: string;
  value: number | string | ReactNode;
  tooltip: string | null;
};
export type InfoCardConfig = {
  title: string;
  description: string;
  content: Content[];
};
const InfoCard = ({ config }: { config: InfoCardConfig }) => {
  if (config.content[0].value === 0) return null;

  return (
    <Card className='border-none'>
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>

      {config.content.map(
        (item) =>
          item.value && (
            <div
              key={item.label}
              className='flex justify-between border-b border-balck-700'
            >
              <CardContent className='flex items-center space-x-2 p-6'>
                <div>{item.label}</div>

                {item.tooltip && (
                  <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger>
                      <IconInfoHexagon className='h-4 w-4' />
                    </HoverCardTrigger>
                    <HoverCardContent>{item.tooltip}</HoverCardContent>
                  </HoverCard>
                )}
              </CardContent>
              <div className='p-4'>{item.value}</div>
            </div>
          )
      )}
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};

export default InfoCard;
