import React from 'react'
import { DownloadLink } from './DownloadsLink';
import Stats from './DownloadStats';

const Downloads = () => {
  return (
    <section
      id = "download"
      className="w-full relative border border-boder flex flex-col md:flex-row gap-4 px-6"
    >
      <div className="w-[75%] flex justify-center bg">
        <DownloadLink />
      </div> 

      <div className="w-[25%] flex justify-center py-12  ">
        <Stats />
      </div>

    </section>
  )
}

export default Downloads