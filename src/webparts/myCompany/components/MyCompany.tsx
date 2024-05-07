import * as React from 'react';
import type { IMyCompanyProps } from './IMyCompanyProps';
import MyCompanyApp from './MyCompanyApp';

export default class MyCompany extends React.Component<IMyCompanyProps, {}> {
  public render(): React.ReactElement<IMyCompanyProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      ConpanyAnnouncementsId,
      siteUrl,
    } = this.props;

    return (
      <div style={{ background: 'antiquewhite', border: 'double', borderRadius: '25px'}}>
        <h1 style={{ textAlign: 'center', }}>Company Announcements</h1>
        <div style={{ borderBottom: '2px solid #333' }}></div>
        <MyCompanyApp props={this.props} />
      </div>
    );
  }
}
