import * as React from 'react';
import { useState, useEffect } from 'react';
import { Web } from 'sp-pnp-js';
import './styles.css'; 

const MyCompanyApp = (props: any) => {
    const [announcementsListData, setAnnouncementsListData] = useState([]);
    const [expandedAnnouncementId, setExpandedAnnouncementId] = useState<number | null>(null);

    const baseUrl = props.props.siteUrl;

    const fetchAPIData = async () => {
        try {
            const web = new Web(baseUrl);
            const fetchedData = await web.lists.getById(props.props.ConpanyAnnouncementsId).items.select('Id,Title,Description,DateOfPosting').get();
            setAnnouncementsListData(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAPIData();
    }, []);

    const truncateDescription = (description: string) => {
        const words = description.split(' ');
        return words.slice(0, 4).join(' ') + '...';
    };

    const toggleExpand = (announcementId: number, description: string) => {
        setExpandedAnnouncementId(prevId => {
            if (prevId === announcementId) {
                return null;
            } else {
                // Open a new tab with full announcement content
                window.open(`/announcement/${announcementId}`, '_blank');
                return announcementId;
            }
        });
    };

    const AnnouncementCard = ({ id, title, description, date }: any) => (
        <div className="announcement-card">
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{expandedAnnouncementId === id ? description : truncateDescription(description)}</p>
            <p className="card-date">{date}</p>
            <button onClick={() => toggleExpand(id, description)} className="read-more-btn">{expandedAnnouncementId === id ? "Read Less" : "Read More"}</button>
        </div>
    );

    return (
        <div className="announcement-container">
            {announcementsListData.map((announcement: any) => (
                <div key={announcement.Id} className="announcement-wrapper">
                    <AnnouncementCard
                        id={announcement.Id}
                        title={announcement.Title}
                        description={announcement.Description}
                        date={new Date(announcement.DateOfPosting).toLocaleDateString()}
                    />
                </div>
            ))}
        </div>
    );
};

export default MyCompanyApp;






// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { Web } from 'sp-pnp-js';
// import './styles.css'; 

// const MyCompanyApp = (props: any) => {
//     const [announcementsListData, setAnnouncementsListData] = useState([]);
//     const [expandedAnnouncementId, setExpandedAnnouncementId] = useState<number | null>(null);

//     const baseUrl = props.props.siteUrl;

//     const fetchAPIData = async () => {
//         try {
//             const web = new Web(baseUrl);
//             const fetchedData = await web.lists.getById(props.props.ConpanyAnnouncementsId).items.select('Id,Title,Description,DateOfPosting').get();
//             setAnnouncementsListData(fetchedData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAPIData();
//     }, []);

//     const truncateDescription = (description: string) => {
//         const words = description.split(' ');
//         return words.slice(0, 4).join(' ') + '...';
//     };

//     const toggleExpand = (announcementId: number) => {
//         setExpandedAnnouncementId(prevId => (prevId === announcementId ? null : announcementId));
//     };

//     const AnnouncementCard = ({ id, title, description, date }: any) => (
//         <div className="announcement-card">
//             <h2 className="card-title">{title}</h2>
//             <p className="card-description">{expandedAnnouncementId === id ? description : truncateDescription(description)}</p>
//             <p className="card-date">{date}</p>
//             <button onClick={() => toggleExpand(id)} className="read-more-btn">{expandedAnnouncementId === id ? "Read Less" : "Read More"}</button>
//         </div>
//     );

//     return (
//         <div className="announcement-container">
//             {announcementsListData.map((announcement: any) => (
//                 <div key={announcement.Id} className="announcement-wrapper">
//                     <AnnouncementCard
//                         id={announcement.Id}
//                         title={announcement.Title}
//                         description={announcement.Description}
//                         date={new Date(announcement.DateOfPosting).toLocaleDateString()}
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default MyCompanyApp;
