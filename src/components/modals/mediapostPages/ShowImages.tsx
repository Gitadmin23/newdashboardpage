import CustomText from '@/components/general/Text'
import { PlusIcon } from '@/components/svg'
import { useDetails } from '@/global-state/useUserDetails'
import AWSHook from '@/hooks/awsHook'
import { IMAGE_URL, URLS } from '@/services/urls'
import { THEME } from '@/theme'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import httpService from '@/utils/httpService'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Progress,
  Spinner,
  Textarea,
  VStack,
  useToast,
  useColorMode
} from '@chakra-ui/react'
import React from 'react'
import { FiChevronLeft, FiMinus, FiPlus } from 'react-icons/fi'
import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query';
import ImageSlider from './ImageSlider'
import CustomButton from '@/components/general/Button'
import useCustomTheme from "@/hooks/useTheme";


function ShowImages({ files, setImage, handleStage, stage, setEmpty, mutate, removeFile }: {files: File[], setImage: (files: FileList, go?: boolean) => void, handleStage: (page: number) => void, removeFile: (index: number) => void, stage: number, setEmpty: () => void, mutate:any}) {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement>();
  const { username, firstName, lastName, publicProfile, userId, user } = useDetails((state) => state);
  const [value, setValue] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const toast = useToast();
  const queryClient = useQueryClient();
  const { uploadedFile, fileUploadHandler, loading } = AWSHook();

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
    headerTextColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const createPost = useMutation({
    mutationFn: (data: any) => httpService.post(`${URLS.CREATE_POST}`, data),
    onSuccess: (data) => {
      handleStage(4);
      queryClient.invalidateQueries(['getPosts']);
      mutate();
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: 'Error',
        description: 'An error occured while uploading file',
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  })

  React.useEffect(() => {
    if (uploadedFile.length > 0 && !loading) {
      const obj = {
        text: value,
        type: files[0].type.startsWith('image') ? 'WITH_IMAGE' : 'WITH_VIDEO_POST',
        isGroupFeed: false,
        sourceId: userId,
        mediaRef: uploadedFile[0].url,
        multipleMediaRef: uploadedFile.map((item) => item.url),
      }
      createPost.mutate(obj);
    }
  }, [files, loading, uploadedFile, userId, value])



  React.useEffect(() => {
    if (files.length > 0) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setIsLoading(false);
        setUrl(fileReader.result as string);
      }
      fileReader.readAsDataURL(files[0]);
    }
  }, [files]);

  const handlePick = React.useCallback((data: FileList) => {
    setImage(data, false);
}, [setImage]);

const handleNext = () => {
  console.log(files);
  if (stage === 3) {
    if (files[0].size > 314572800) {
      toast({
        title: 'Warniing',
        description: 'File size must be less than or equal to 300MB',
        position: 'top-right',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return
    }
    fileUploadHandler(files as any);
    return;
  } else {
    handleStage(stage+1);
  }
}

const handlePrev = React.useCallback(() => {
  if (stage === 2) {
    setEmpty();
    handleStage(stage - 1);
    return;
  }
  handleStage(stage-1);
}, [handleStage, setEmpty, stage]);

const handleChange = (e: string) => {
  if (value.length < 60000) {
    setValue(e);
  }
}


  return (
    (<VStack maxWidth='500px' minWidth={'300px'} height='auto' overflow={'hidden'} bg={mainBackgroundColor}>
      <input hidden type='file' accept="image/*, video/*" ref={inputRef as any} onChange={(e) => handlePick(e.target.files as FileList)} />
      <HStack width='100%' height='70px' bg={mainBackgroundColor} justifyContent={'space-between'} paddingX='10px' alignItems={'center'} paddingTop={'10px'} borderBottomWidth={'0.3px'} borderBottomColor={borderColor}>
          <FiChevronLeft size={'25px'} onClick={handlePrev} style={{ cursor: 'pointer' }} color={THEME.COLORS.chasescrollButtonBlue} />
          {!loading && !createPost.isLoading && (
            // <CustomText cursor='pointer' onClick={handleNext} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} fontSize={'sm'}>{stage > 2 ? 'Create Post' : 'Next'}</CustomText>
            (<CustomButton onClick={handleNext} borderWidth={"0.3px"} color={colorMode === "light" ? "#5465E0":bodyTextColor} backgroundColor={colorMode === "light" ? "#EFF1FE":secondaryBackgroundColor} fontWeight={"bold"} px={"6"} height={'30px'} rounded={"0px"} width={"fit-content"} text={stage < 2 ? 'Next':'Post' } />)
          )}
          {
            loading && (
              <Box width='50px'>
                <Spinner colorScheme={'blue'} />
                {/*<Progress isIndeterminate colorScheme='blue' width={'100%'} size='sm' />*/}
              </Box>
            )
          }
          {
           createPost.isLoading && (
              <Box width='50px'>
                <Spinner colorScheme={'blue'} />
                {/*<Progress isIndeterminate colorScheme='blue' width={'100%'} size='sm' />*/}
              </Box>
            )
          }
      </HStack>
      <VStack alignItems='flex-start' bg={mainBackgroundColor} width='100%' height='180px' paddingX='20px' paddingTop={'20px'} justifyContent={'flex-start'} fontFamily={'Satoshi-Regular'}>

        <HStack>
          <Box  width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
            {user?.data.imgMain.value === null && (
                <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                  <CustomText fontFamily={'DM-Regular'}>{user?.firstName[0].toUpperCase()}{user?.lastName[0].toUpperCase()}</CustomText>
                </VStack>
            )}
            {
                user?.data.imgMain.value !== null && (
                    <>
                      { user?.data?.imgMain?.value.startsWith('https://') && <Image src={`${user?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                      { !user?.data?.imgMain?.value.startsWith('https://') && <Image src={`${IMAGE_URL}${user?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                    </>
                )
            }
          </Box>
          <CustomText>{capitalizeFLetter(firstName)} {capitalizeFLetter(lastName)}</CustomText>
        </HStack>

        <Textarea value={value} borderWidth={0} placeholder='Write something about  your post' _placeholder={{ color: bodyTextColor}} bg={secondaryBackgroundColor} onChange={(e) =>handleChange(e.target.value)} />

        <HStack width={'100%'} justifyContent={'flex-end'}>
          <CustomText fontFamily={'Satoshi-Light'} fontSize={'ms'}>{value.length}/60000</CustomText>
        </HStack>

      </VStack>
      {files.length < 1 && (
          <VStack cursor={'pointer'} onClick={() => {
            if (files.length === 4) {
              return;
            } else {
              inputRef.current?.click();
            }
          }} height={'300px'} alignItems={'center'} width='500px' paddingX={'10px'}  overflowX={'auto'} backgroundColor={"#EFF1FE"} borderStyle={'dashed'} borderWidth={'1px'} borderColor={'brand.chasescrollButtonBlue'} justifyContent={'center'} >
            <Image src='/assets/images/Add.png' alt='smile' width={'64px'} height={'64px'} />
            <CustomText color={'grey'} fontFamily={'DM-Medium'} fontSize={'18px'}>Add Images or video</CustomText>
          </VStack>
      )}
      { files.length > 0 && (
          <Flex position='relative' maxWidth='500px' minWidth={'350px'} maxHeight={'500px'} minH={'350px'} borderRadius='0px'>

            { isLoading && (
                <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'} >
                  <Progress isIndeterminate colorScheme='blue' width={'100%'} size='sm' />
                </VStack>
            )}

            { !isLoading && url !== '' && (
                <VStack width={'100%'} zIndex={1} height='auto' overflow={'hidden'}>
                  {files.length > 0 && files[0].type.startsWith('video') && (
                      <video controls width={'100%'} height={'300px'}>
                        <source src={url} type='video/mp4' />
                      </video>
                  )}
                  {files.length > 0 && files[0].type.startsWith('image') && (
                      <ImageSlider type='upload' files={files} setCurrentIndex={(index) => {
                        console.log(index);
                        setCurrentIndex(index);
                      }} />
                  )}
                </VStack>
            )}

            {/* ADD MORE BUTTON */}

          </Flex>
      )}
      {
        files.length > 0 && (
          <HStack height={'120px'} alignItems={'center'} width='100%' paddingX={'10px'}  overflowX={'auto'} bg={colorMode === "light" ? 'whitesmoke':mainBackgroundColor}>
            { files.map((file, index) => (
              <Box borderWidth={currentIndex === index ? 1:0} borderColor={"brand.chasescrollButtonBlue"} key={index.toString()} marginRight={'5px'} width='100px' height='70%' borderRadius={'10px'} position={'relative'}>

                <Box width='100%' height='100%' borderRadius={'10px'} overflow={'hidden'}>
                  <Image src={URL.createObjectURL(file)} alt="img" width={'100px'} height='100%' objectFit={'cover'} />
                </Box>

                <VStack onClick={() => removeFile(index)} width='20px' height='20px' borderRadius={'10px'} position='absolute' top='-5px' right='-5px' bg='red' color='white' alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
                  <FiMinus size={'20px'} color='white' />
                </VStack>
              </Box>
            ))}
            { files.length < 4 && (
                <VStack cursor={"pointer"} onClick={() => {
                  if (files.length === 4) {
                    return;
                  } else {
                    inputRef.current?.click();
                  }
                }} justifyContent={'center'} alignItems={'center'} width={'100px'} height={'70%'} borderWidth={'1px'} borderRadius={'10px'} borderColor={primaryColor} borderStyle={'dashed'}>
                  <Image src='/assets/images/Add.png' alt='smile' width={'34px'} height={'34px'} />
                </VStack>
            )}
          </HStack>
        )
      }
    </VStack>)
  );
}

export default ShowImages
