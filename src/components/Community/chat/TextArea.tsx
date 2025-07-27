import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import { THEME } from '@/theme';
import httpService from '@/utils/httpService';
import {
  HStack, Input, Spinner, VStack, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Divider,
  Image,
  Box,
  Button,
  Portal,
  useToast, useColorMode
} from '@chakra-ui/react'
import React from 'react'
import { FiSend, FiSmile, FiPlusCircle } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import EmojiPicker from 'emoji-picker-react';
import CustomText from '@/components/general/Text';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { useCommunityPageState } from '@/components/Community/chat/state';
import AWSHook from '@/hooks/awsHook';
import MediaBox from './MediaBox';
import useCustomTheme from "@/hooks/useTheme";

const IMAGE_FORM = ['jpeg', 'jpg', 'png', 'svg'];
const VIDEO_FORM = ['mp4'];
const DOC_FORM = ['pdf', 'doc'];


function TextArea() {
  const [text, setText] = React.useState('');
  const [showEmoji, setShowEmoi] = React.useState(false);
  const [files, setFiles] = React.useState<Array<{ file: string, url: string }>>([]);
  const [showUploader, setShowUploader] = React.useState(false);
  const toast = useToast();
  const { username } = useDetails((state) => state)

  const { fileUploadHandler, loading, uploadedFile, reset, deleteFile } = AWSHook();
  const ref = React.useRef<HTMLInputElement>();
  const containerRef = React.useRef<HTMLDivElement>();
  const queryClient = useQueryClient();
  const { activeCommunity } = useCommunityPageState((state) => state);
  const { userId } = useDetails((state) => state);

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const createPost   = useMutation({
    mutationFn: (data: any) => httpService.post(`${URLS.CREATE_POST}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries([`getMessage-${activeCommunity?.id}`]);
      setText('');
      setFiles([]);
      reset();
    },
    onError: () => {
      toast({ 
        title: 'Error',
        description: 'An errorr occured',
        status: 'error',
        position: 'top-right'
      })
    }
  });

  const handleFilePick = React.useCallback((uploaded: Array<any>) => {
    setFiles(prev => [...prev, ...uploaded]);
  }, [])

  React.useEffect(() => {
    if (uploadedFile.length > 0) {
      handleFilePick(uploadedFile);
    } else {
      setFiles([]);
    }
  }, [handleFilePick, uploadedFile])

  const handleFilePic = (files: FileList) => {
    fileUploadHandler(files);
    setShowUploader(false);
  }


  const accept = React.useCallback((): string => {
    if (uploadedFile.length < 1) {
      return "image/*, video/mp4, application/*"
    } else {
      // check file type
      const file = uploadedFile[0];
      const _format_ = file?.url?.split('.');
      const format = _format_[_format_.length - 1];
      if (IMAGE_FORM.includes(format.toLowerCase())) {
        return "image/*"
      } else if (VIDEO_FORM.includes(format.toLowerCase())) {
        return "video/*"
      } else {
        return "application/*"
      }
      
    }
  }, [uploadedFile])

 


  const submit = () => {
    if (text ==='' && uploadedFile.length < 1) {
      return
    }
    if (loading){
      return;
    }
    if (uploadedFile.length < 1) {
      createPost.mutate({
        text,
        type: 'NO_IMAGE_POST',
        isGroupFeed: true,
        sourceId: activeCommunity?.id
      })
    } else {
      const file = uploadedFile[0];
      if (file === undefined) return;
      const _format_ = file?.url?.split('.');
      const format = _format_[_format_.length - 1];
      console.log(format);
      if (IMAGE_FORM.includes(format.toLowerCase())) {
        createPost.mutate({
          text,
          type: 'WITH_IMAGE',
          isGroupFeed: true,
          sourceId: activeCommunity?.id,
          mediaRef: file.url,
          multipleMediaRef: files.map((item) => item.url),
        });
      } else if (VIDEO_FORM.includes(format.toLowerCase())) {
        createPost.mutate({
          text,
          type: 'WITH_VIDEO_POST',
          isGroupFeed: true,
          sourceId: activeCommunity?.id,
          mediaRef: file.url,
          multipleMediaRef: files.map((item) => item.url),
        });
      } else if (DOC_FORM.includes(format.toLowerCase())) {
        createPost.mutate({
          text,
          type: 'WITH_FILE',
          isGroupFeed: true,
          sourceId: activeCommunity?.id,
          mediaRef: file.url,
          multipleMediaRef: files.map((item) => item.url),
        });
      } else {
        createPost.mutate({
          text,
          type: 'WITH_FILE',
          isGroupFeed: true,
          sourceId: activeCommunity?.id,
          mediaRef: file.url,
          multipleMediaRef: files.map((item) => item.url),
        });
      }
    }
  }
  return (
    <VStack width='100%' height={'auto'} maxH={'230px'} bg='transparent' paddingY='10px'mb={"10px"} paddingX="10px" position={'relative'}>
      <input ref={ref as any} onChange={(e) => handleFilePic(e.target.files as FileList)} hidden type='file' accept={accept()} />
        <VStack ref={containerRef as any} width={'100%'} height='100%' borderWidth={'0.5px'} bg={secondaryBackgroundColor} borderColor={borderColor} borderRadius={'10px'} paddingX='8px' paddingY='8px' position={'relative'}>

            { showEmoji && (
                <Box position={'absolute'} height={'400px'} top='-450px' left={'0px'}>
                    <EmojiPicker  onEmojiClick={(e) => setText(prev => prev + e.emoji)} />
                </Box>
            )}

            <textarea value={text} onChange={(e) => setText(e.target.value)} style={{
              width: '100%', height: 'auto', backgroundColor: 'transparent',
              outline: 'none', resize: 'none',
            }} placeholder={`Say something @${username}`} />

            { uploadedFile.length > 0 &&
              <Box width={'100%'} height={'100px'} flex='1' display={'inline-block'} whiteSpace={'nowrap'}>
                {
                  uploadedFile.map((item, index) => {
                    const __format__ = item.url.split('.');
                    const format = __format__[__format__.length - 1];
                    if (IMAGE_FORM.includes(format)) {
                      return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                          <Image cursor={'pointer'} src={item.url} alt='image' key={index.toString()} objectFit={'cover'} width='60px' height='60px' borderRadius={'8px'} display={'inline'} marginRight={'10px'} />
                        </MediaBox>
                      )
                    }
                    if (VIDEO_FORM.includes(format)) {
                      return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                          <video key={index.toString()} controls style={{ width: '60px', height: '60px', borderRadius: '8px', marginRight: '10px' }}>
                            <source src={item.url} type='video/mp4'  />
                          </video>
                        </MediaBox>
                      )
                    }
                    if (DOC_FORM.includes(format)) {
                      return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                          <HStack width='100%' bg='whitesmoke' borderRadius={'10px'} padding='5px'>
                            <VStack cursor={'pointer'}  width={'60px'} height={'60px'} borderRadius={'8px'} justifyContent={'center'} alignItems={'center'} bg='lightgrey'>
                                <CustomText fontFamily={'DM-Bold'} fontSize={'20px'}>{format.toUpperCase()}</CustomText>
                            </VStack>
                            <VStack alignItems={'flex-start'}>
                                <CustomText fontFamily={'DM-Regular'} color='brand.chasescrollButtonBlue'>{item.file.length > 10 ? item.file.substring(0, 10) + '...': item.file}</CustomText>
                                <CustomText fontFamily={'DM-Bold'} fontSize='14px' color='grey'>{format.toUpperCase()}</CustomText>
                            </VStack>
                          </HStack>
                        </MediaBox>
                      )
                    }
                    return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                        <HStack width='100%' bg='whitesmoke' borderRadius={'10px'} padding='5px'>
                          <VStack cursor={'pointer'}  width={'60px'} height={'60px'} borderRadius={'8px'} justifyContent={'center'} alignItems={'center'} bg='lightgrey'>
                              <CustomText fontFamily={'DM-Bold'} fontSize={'20px'}>{format.toUpperCase()}</CustomText>
                          </VStack>
                          <VStack alignItems={'flex-start'}>
                              <CustomText fontFamily={'DM-Regular'} color='brand.chasescrollButtonBlue'>{item.file.length > 10 ? item.file.substring(0, 10) + '...': item.file}</CustomText>
                              <CustomText fontFamily={'DM-Bold'} fontSize='14px' color='grey'>{format.toUpperCase()}</CustomText>
                          </VStack>
                        </HStack>
                      </MediaBox>
                    )
                  })
                }
              </Box>
            }

            <HStack width='100%' alignItems={'center'} justifyContent={'space-between'}>

                <HStack alignItems={'center'} >

                   <Popover isOpen={showUploader} placement='top' size={''}>
                       <PopoverTrigger>
                        <Box>
                        { !loading && <Image onClick={() => setShowUploader(prev => !prev)} src='/assets/images/Add.png' alt='smile' width={'24px'} height={'24px'} /> }
                          { loading && <Spinner size='md' />}
                        </Box>
                       </PopoverTrigger>
                      <PopoverContent width='200px' height='70px'>
                        <PopoverArrow />
                        <PopoverBody>
                          <CustomText>Attach</CustomText>
                          <Divider orientation='horizontal' />
                          <HStack cursor={'pointer'} onClick={() => ref?.current?.click()} flex='1' alignItems={'center'} height='70%'>
                            <Image src='/assets/images/monitor.png' alt='img' width='20px' height='20px' />
                            <CustomText>Upload from device</CustomText>
                          </HStack>
                        </PopoverBody>
                      </PopoverContent>
                   </Popover>

                   <Image src='/assets/images/Smiley.svg' alt='smile' width={'24px'} height={'24px'} onClick={() => setShowEmoi(prev => !prev)} />

                </HStack>

                { !createPost.isLoading && <Image onClick={() => submit()} src='/assets/images/send.svg' alt='smile' width={'24px'} height={'24px'} /> }
                { createPost.isLoading && <Spinner size='sm' />}

            </HStack>

        </VStack>
    </VStack>
  )
}

export default TextArea