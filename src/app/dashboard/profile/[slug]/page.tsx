import React from 'react'
import GetProfile from '../get_profile'


export default async function ProfilePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return <GetProfile profile_index={params.slug} />
}